/**
 * 这里我使用commitlint.config.mjs 使用esmodule导入，但是commitlint的配置不生效
 * 因此改成了使用commonjs进行导出配置
 */

module.exports = require('@nox/commitlint-config')
