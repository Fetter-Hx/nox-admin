import type { UserConfig } from 'vite'

/**
 * 获取通用vite配置
 */
async function getCommonConfig(): Promise<UserConfig> {
  return {
    // 构建配置项
    build: {
      sourcemap: false,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1000
    }
  }
}

export { getCommonConfig }
