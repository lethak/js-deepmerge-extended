/**
 * @fileoverview A modified version of the `multiline-comment-style` rule that ignores transform block style and missing star
 */
'use strict'
const ruleComposer = require('eslint-rule-composer')
const multilineCommentStyle = require('eslint/lib/rules/multiline-comment-style')

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = ruleComposer.filterReports(
  multilineCommentStyle,
  (problem, metadata) => {

    const allowedProblemIdList = [
      'alignment',
      'startNewline',
      'endNewline',
    ]

    return !problem.messageId || allowedProblemIdList.includes(problem.messageId)
  }
)
