const plugins = [
    ['umi-plugin-react', {
        antd: true,
        dva: true,
    }],
];

export default {
    plugins,
    routes: [
        {
            path: '/',
            component: '../layouts/BaseLayout',
            routes: [
                { path: '/', component: './task/Task' },
                { path: '/task', component: './task/Task' },
                { path: '/note', component: './note/Note' },
                { path: '/project', component: './project/Project' },
                { path: '/tag', component: './tag/Tag' },
                { path: '/position', component: './position/Position' },
                { path: '/search', component: './search/SearchText' },
            ]
        }
    ],
    // proxy: {
    //     '/dev': {
    //         target: 'http://localhost:8001',
    //         changeOrigin: true,
    //     },
    // },
};