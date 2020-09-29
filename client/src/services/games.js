import api from './api-helper'

export const getGames = async () => {
  const res = await api.get(`games`)
  return res.data
}

export const readGame = async (code) => {
  const res = await api.get(`game/${code}/users`)
  return res.data
} 

export const postGame = async (gameData) => {
  const res = await api.post('/games', { game: gameData })
  return res.data
}

export const destroyTask = async (id) => {
  const res = await api.delete(`game/${id}`)
  return res
}