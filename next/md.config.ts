const container = require("markdown-it-container");
const markdownRenderer = require('markdown-it')();
const striptags = require('./strip-tags.js')

const convertHtml = str => {
  return str.replace(/(&#x)(\w{4});/gi, $0 => String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16)))
}

module.exports = (md: any) => {
  md.use(container, 'demo', {
    validate: params => params.trim().match(/^demo\s*(.*)$/),
      render: (tokens, idx) => {
        if (tokens[idx].nesting === 1) {
          const html = convertHtml(striptags(tokens[idx + 1].content, 'script'))

          return `<demo>
                    <template #demo>${html}</template>
                    <template #sourceCode>`
        }
        return '</template></demo>'
      }
  })
};