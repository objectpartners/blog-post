const inquirer = require('inquirer');
const fs = require('fs-extra');
const slugify = require('limax');
const path = require('path');

const { isNonEmpty, isAuthorName, formatDate } = require('./util');

module.exports = async function run({ base = path.join(process.cwd(), 'content/blog') } = {}) {
  const now = new Date();

  const answers = await inquirer.prompt([
    { type: 'input', name: 'title', message: 'Blog post title', validate: isNonEmpty },
    { type: 'input', name: 'description', message: 'Short description of the blog post (<= 200 characters)', validate: isNonEmpty },
    { type: 'input', name: 'author', message: 'Author name (First Last)', validate: isAuthorName },
    { type: 'list', name: 'category', message: 'Category', choices: ['JavaScript', 'Devops', 'JVM', 'Mobile', 'Misc']},
    { type: 'input', name: 'date', message: 'Date', default: formatDate(now) },
    { type: 'editor', name: 'post', message: 'Post contents (feel free to just open and save)' }
  ]);

  const template = `
---
title: "${answers.title.replace(/"/g, '\"')}"
author: ${answers.author}
date: ${now.toJSON()}
category: ${answers.category}
meta:
  description: ${answers.description}
  keywords:
    - ${answers.category}
---

${answers.post}
  `.trim() + '\n';

  try {
    await fs.ensureDir(base);

    await fs.writeFile(path.join(base, `${formatDate(answers.date)}-${slugify(answers.title)}.md`), template, 'utf8');
  } catch (e) {
    console.error(e);
  }
};
