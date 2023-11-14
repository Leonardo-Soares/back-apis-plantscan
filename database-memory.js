import { randomUUID } from "crypto"

export class DatabaseMemory {
  #videos = new Map()

  list() {
    return Array.from(this.#videos.entries()).map((videoArray) => {
      const id = videoArray[0]
      const data = videoArray[1]

      return {
        id, 
        ...data
      }
    }) // retornar somente os valores
  }

  create(video) {
    const videoId = randomUUID()

    this.#videos.set(videoId, video)
  }

  update(id, video) {
    this.#videos.set(id, video)
  }

  update(id) {
    this.#videos.delete(id)
  }
}