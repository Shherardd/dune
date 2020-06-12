'use strict'

const debug = require('debug')('dune:db')
const inquirer = require('inquirer')
const chalk = require('chalk')
const db = require('./')

const prompt = inquirer.createPromptModule() // Este objeto prompt permite hacer preguntas en forma de promesas que se resuelven cuando el usuario responde a la pregunta en la consola

async function setup () {
  const answer = await prompt ([{
      type: 'confirm',
      name: 'setup',
      message: 'Esto va a destruir la base de datos, Esta seguro?'
  }])
  if (!answer.setup) {
      return console.log('Nothing Happened.')
  }

  const config = {
    database: process.env.DB_NAME || 'dune',
    username: process.env.DB_USER || 'shd',
    password: process.env.DB_PASS || 'gg',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    loggin: s => debug(s),
    setup: true
  }
  await db(config).catch(handleFatalError)

  console.log('success!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(`${chalk.red('[Fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()
