import { randomUUID } from "crypto" // importando randomUUID de node:crypto

class DatabaseMemory {
    #videos = new Map() // usando Estrutura de dados Map
    

    list(search) {

        return Array.from(this.#videos.entries())
        .map((videoArray) => {
            const id = videoArray[0]
            const data = videoArray[1]

            return {
               id,
               ...data 
            }
        }).filter(video => {
            if (search) {
                return video.title.includes(search)
            }

            return true
        })
    }
    
    create(video) {

        const videoId = randomUUID() // gera um id com  UUID

        this.#videos.set(videoId, video) 
    }

    update(id, video) {
        this.#videos.set(id, video)
    }

    delete(id) {
        this.#videos.delete(id)
    }

}

export default DatabaseMemory;