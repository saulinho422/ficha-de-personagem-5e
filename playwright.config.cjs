const {defineConfig}=require('@playwright/test');
module.exports=defineConfig({testDir:'tests/navegador',timeout:45000,use:{baseURL:'http://127.0.0.1:8765',viewport:{width:1280,height:900},trace:'retain-on-failure'},webServer:{command:'python3 -m http.server 8765 --bind 127.0.0.1',port:8765,reuseExistingServer:!process.env.CI},reporter:[['list'],['html',{open:'never'}]]});
