## 基础的vue-i18n通用公共配置包

语言包配置在 src/langs文件夹下 ，形如 src/langs/zh-CN/xxxx  ，使用json文件

## FAQ

如遇在设置globalInjection:true后，在vue模板中使用$t 报告类型错误，尝试以下解决方案：

终端输入以下命令以优化依赖关系 再重新安装依赖

关联的issue:https://github.com/intlify/vue-i18n/issues/1403

```
pnpm dedupe   pnpm install
```

