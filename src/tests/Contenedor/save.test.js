const path = require('path');
const unlink = require('fs/promises').unlink;
const writeFile = require('fs/promises').writeFile;
const readdir = require('fs/promises').readdir;
const Contenedor = require('../../Contenedor');
const randomUser = require('../../utilities/randomUser').randomUser;

const absPath = path.resolve('./src/tests')

describe('save method', () => {
  afterEach(async () => {
    const thisPath = await readdir(absPath)
    const regex = /\.(json|txt)$/
    thisPath
      .filter((path) => regex.test(path))
      .forEach(async (fileName) => {
        await unlink(absPath + '/' + fileName)
      })
  })

  test('si el archivo no existe crear archivo', async () => {
    const userTest = randomUser()
    const file = absPath + '/save2.json'
    const updatedFile = new Contenedor(file)

    const id = await updatedFile.save(userTest)
    expect(id).toBe(await updatedFile.lastId)
  })

  test('si el archivo existe agregar dato al archivo', async () => {
    const userTest = randomUser()
    const file = absPath + '/save1.json'
    const firstData = JSON.stringify([
      {
        some: 'data',
        id: 0,
      },
    ])
    await writeFile(file, firstData)
    const updatedFile = new Contenedor(file)

    const id = await updatedFile.save(userTest)
    expect(id).toBe(await updatedFile.lastId)
  })

  test('si el archivo existe y tiene mas de 1 elemento debe agregar un elemento al archivo con el id correcto', async () => {
    const userTest = randomUser()
    const file = absPath + '/save3.json'

    const generatedData = new Array(5)
      .fill(randomUser())
      .map((obj, i) => ({ ...obj, id: i }))
    const jsonData = JSON.stringify(generatedData)

    await writeFile(file, jsonData)
    const updatedFile = new Contenedor(file)

    const id = await updatedFile.save(userTest)
    expect(id).toBe(5)
  })

  test('si el archivo existe y esta vacio debe escribir en el archivo', async () => {
    const file = absPath + '/save4.json'
    const userTest = randomUser()

    await writeFile(file, '')
    const updatedFile = new Contenedor(file)
    const id = await updatedFile.save(userTest)
    expect(id).toBe(1)
  })
})
