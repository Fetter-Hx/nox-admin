import plugin from 'tailwindcss/plugin'

const enterAnimationPlugin = plugin(({ addUtilities }) => {
  const max = 5
  const utilities: Record<string, any> = {}
  for (let i = 1; i <= max; i++) {
    const baseDelay = 0.1
    const delay = `${baseDelay * i}s`
    // 从左侧进入
    utilities[`.enter-left:nth-child(${i})`] = {
      animation: `enter-x-animation 0.3s ease-in-out ${delay} forwards`,
      opacity: '0',
      transform: 'translateX(-50px)'
    }
    // 从右侧进入
    utilities[`.enter-right:nth-child(${i})`] = {
      animation: `enter-x-animation 0.3s ease-in-out ${delay} forwards`,
      opacity: '0',
      transform: 'translateX(50px)'
    }
    // 从上侧进入
    utilities[`.enter-top:nth-child(${i})`] = {
      animation: `enter-y-animation 0.3s ease-in-out ${delay} forwards`,
      opacity: '0',
      transform: 'translateY(-50px)'
    }
    // 从下侧进入
    utilities[`.enter-bottom:nth-child(${i})`] = {
      animation: `enter-y-animation 0.3s ease-in-out ${delay} forwards`,
      opacity: '0',
      transform: 'translateY(50px)'
    }
  }
  // 动画关键帧
  addUtilities({
    '@keyframes enter-x-animation': {
      to: {
        opacity: '1',
        transform: 'translateX(0)'
      }
    },
    '@keyframes enter-y-animation': {
      to: {
        opacity: '1',
        transform: 'translateY(0)'
      }
    }
  })
  addUtilities(utilities)
})

export { enterAnimationPlugin }
