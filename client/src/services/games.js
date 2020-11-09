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

export const destroyGame = async (code) => {
  const res = await api.delete(`game/${code}`)
  return res
}

export const updateGame = async (code, userData) => {
  const res = await api.put(`game/${code}`, { users: userData} )
  return res.data
}

export const postUser = async (userData) => {
  const res = await api.post('/users/', {user: userData})
  return res.data
}

export const deleteUser = async (id) => {
  const res = await api.delete(`/users/${id}`)
}

export const sendCombatants = async (code, combatants) => {
  const res = await api.put(`/game/${code}/start`, { code, combatants })
  return res.data 
}

export const takeTurn = async (code, gameData) => {
  const res = await api.put(`/game/${code}/turn`, { code, combatants: gameData.combatants })
  
  return res.data
}