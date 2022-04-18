const server = require("../server")
const axios = require("axios")

const endpoint1 = "http://localhost:8080/api/devices"
const endpoint2 = "http://localhost:8080/api/coords"

afterAll( () => server.close())


describe("read entities", () => {
  
  test("read complete collection without options", () => axios.get(endpoint1)
    .then( resp => expect(resp.data.length).toBe(3) )
  )

  test("read complete collection without id", () => axios.get(`${endpoint1}?dummy=1`)
    .then( resp => expect(resp.data.length).toBe(3))
  )

  test("read one entity by id from params", () => axios.get(`${endpoint1}/1`)
    .then( resp => expect(resp.data.name).toBe("Android"))
  )

  test("read one entity by id from query", () => axios.get(`${endpoint1}?id=1`)
    .then( resp => expect(resp.data.name).toBe("Android"))
  )

  test("read empty by unresolved id", () => axios.get(`${endpoint1}?id=1`)
    .then( resp => expect(resp.data.length).toBeUndefined())
  )

})  

describe("test CRUD", () => {
  let entityId
  let last_data
  test("create, update, delete workflow", () => axios.post(endpoint1,{
      name:"George Washington"
    })
    .then( resp => {
      entityId = resp.data.id
      expect(resp.data.name).toBe("George Washington")
      return axios.get(endpoint1)
    })
    .then( resp => {
      expect(resp.data.length).toBe(4)
      return axios.put(`${endpoint1}?id=${entityId}`, {
        name:"George Washington",
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg/240px-Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg"   
      })
    })
    .then( resp => {
      expect(resp.data.id).toBe(entityId)
      return axios.delete(`${endpoint1}?id=${entityId}`)
    })
    .then( resp => {
      expect(resp.data[0].id).toBe(entityId)
      return axios.get(endpoint1)
    })
    .then( resp => expect(resp.data.length).toBe(3))
  )
})
