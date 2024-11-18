# @nox-core/icons

icons核心模块  集成了@iconify/vue 
引入了lucide图标库 也可以引入一些其他想使用的图标库 暴露出需要使用的图标

暴露createIconifyIcon方法   可以按如下方法进行使用：

```typescript
import { createIconifyIcon } from '@nox-core/icons'

//这里暴露出一个名为MdiGithud的图标组件
export const MdiGithub = createIconifyIcon('mdi:github')
```

