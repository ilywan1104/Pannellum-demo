declare module "*.svg" {
    const content: any;
    export default content;
}

declare module "*.css" {
    const content: any;
    export default content;
}

// 定义window变量
interface Window {
    pannellum: any
}