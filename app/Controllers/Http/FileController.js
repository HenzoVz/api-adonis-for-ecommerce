'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers')

class FileController {

  async store ({ request, response }) {
    try {
      // 1 - verifica a existência de uma arquivo file
      if (!request.file('file')) return

      // define configurações do arquivo
      const upload = request.file('file', { size: '2mb' })

      // define nome do arquivo
      const fileName = `${Date.now()}.${upload.subtype}`

      // move o arquivo para uma pasta
      await upload.move(Helpers.tmpPath('uploads'), {
        name: fileName
      })

      if (!upload.moved()) {
        return upload.error()
      }

      // cadastra no banco
      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      })

      return file
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Erro no upload de arquivo' } })
    }
  }

  async show ({ params, response }) {
    try {
      const file = await File.findOrFail(params.id)

      return response.download(Helpers.tmpPath(`uploads/${file.file}`))
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Arquivo não existe' } })
    }
  }
}

module.exports = FileController
