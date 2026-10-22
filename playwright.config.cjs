const {defineConfig}=require('@playwright/test');
module.exports=defineConfig({testDir:'tests/navegador',timeout:45000,use:{baseURL:'http://127.0.0.1:8765',viewport:{width:1280,height:900},trace:'retain-on-failure'},webServer:{command:'node scripts/servidor.cjs',port:8765,reuseExistingServer:!process.env.CI},reporter:[['list'],['html',{open:'never'}]]});
