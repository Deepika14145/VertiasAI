
import React, { useRef, useEffect } from 'react';
import type { TrustGraphData } from '../../types';
import { GraphIcon } from '../icons';

// D3 is loaded from a script tag in index.html, so we declare it here.
declare const d3: any;

interface TrustGraphCardProps {
  data: TrustGraphData;
}

const colors = {
    'Claim': '#3b82f6', // blue
    'Source': '#16a34a', // green
    'Social Media Post': '#ea580c', // orange
    'Derivative': '#dc2626' // red
};

export const TrustGraphCard: React.FC<TrustGraphCardProps> = ({ data }) => {
    const ref = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!data || !ref.current) return;

        const { nodes, links } = data;
        const width = ref.current.parentElement?.clientWidth || 600;
        const height = 400;

        const svg = d3.select(ref.current)
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', [-width / 2, -height / 2, width, height])
            .attr('style', 'max-width: 100%; height: auto;');

        // Clear previous render
        svg.selectAll("*").remove();
        
        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id((d: any) => d.id).distance(100))
            .force('charge', d3.forceManyBody().strength(-200))
            .force('center', d3.forceCenter());

        const link = svg.append('g')
            .attr('stroke', '#999')
            .attr('stroke-opacity', 0.6)
            .selectAll('line')
            .data(links)
            .join('line')
            .attr('stroke-width', 2);

        const node = svg.append('g')
            .selectAll('g')
            .data(nodes)
            .join('g')
            .call(drag(simulation));

        node.append('circle')
            .attr('r', (d: any) => d.radius || 15)
            .attr('fill', (d: any) => colors[d.group as keyof typeof colors] || '#ccc');

        node.append('text')
            .text((d: any) => d.id.replace(/_/g, ' '))
            .attr('x', 18)
            .attr('y', 5)
            .attr('font-size', '12px')
            .attr('fill', '#334155');

        simulation.on('tick', () => {
            link
                .attr('x1', (d: any) => d.source.x)
                .attr('y1', (d: any) => d.source.y)
                .attr('x2', (d: any) => d.target.x)
                .attr('y2', (d: any) => d.target.y);

            node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
        });

        function drag(simulation: any) {
            function dragstarted(event: any) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                event.subject.fx = event.subject.x;
                event.subject.fy = event.subject.y;
            }

            function dragged(event: any) {
                event.subject.fx = event.x;
                event.subject.fy = event.y;
            }

            function dragended(event: any) {
                if (!event.active) simulation.alphaTarget(0);
                event.subject.fx = null;
                event.subject.fy = null;
            }

            return d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended);
        }

    }, [data]);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
                <GraphIcon className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-slate-800">Chain-of-Trust Evidence Graph</h3>
            </div>
            <p className="text-slate-500 mb-4 text-sm">A visualization of the claim's origin and spread. Strong sources are larger and colored green.</p>
            <div className="w-full">
                <svg ref={ref}></svg>
            </div>
            <div className="flex justify-center items-center gap-4 mt-4 text-sm">
                {Object.entries(colors).map(([key, color]) => (
                    <div key={key} className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></span>
                        <span>{key}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
