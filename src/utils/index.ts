// import { randomInt } from 'crypto';

// interface HeatmapPoint {
//     lat: number;
//     lng: number;
//     count: number;
// }

// export function generateRandomPoint(minLat: number, maxLat: number, minLng: number, maxLng: number): HeatmapPoint {
//     const lat = randomInt(minLat * 100000, (maxLat + 1) * 100000) / 100000;
//     const lng = randomInt(minLng * 100000, (maxLng + 1) * 100000) / 100000;
//     const count = randomInt(1, 100); // 热度值范围从1到100
//     return { lat, lng, count };
// }

// export function generateHeatmapData(numPoints: number, minLat: number, maxLat: number, minLng: number, maxLng: number): HeatmapPoint[] {
//     const points: HeatmapPoint[] = [];
//     for (let i = 0; i < numPoints; i++) {
//         points.push(generateRandomPoint(minLat, maxLat, minLng, maxLng));
//     }
//     return points;
// }

export function getPercent (item:number,total:number):string {
    return (item / total * 100).toFixed(2)  + '%';
}

// 使用示例
// const heatmapData = generateHeatmapData(100, 39.9, 40.1, 116.3, 116.5);
// console.log(heatmapData);
