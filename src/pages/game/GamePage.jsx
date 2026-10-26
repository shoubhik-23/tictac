
import { useEffect, useState } from 'react'
import { Box, Typography, Button, } from '@mui/material'
import { useGame } from '../../hooks'

const winniningPossibility = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export const GamePage = () => {
  const { setScoreHandle, scoreboard } = useGame()
  const [board, setBoard] = useState(Array(9).fill(null))
  const [playerX, setPlayerX] = useState(true)
  const [moveHistory, setMoveHistory] = useState([])
  const winningItems = winniningPossibility.find(
    ([a, b, c]) =>
      board[a] &&
      board[a] === board[b] &&
      board[b] === board[c]
  )
  const winner = winningItems
    ? board[winningItems[0]]
    : null

  const isDraw = !winner && board.every(Boolean)
  const gameOver = Boolean(winner) || isDraw



  useEffect(() => {
    if (winner) {
      setScoreHandle(winner)
    }

  }, [winner])

  const handleClick = (index) => {
    if (board[index] || gameOver) return

    const newBoard = [...board]
    newBoard[index] = playerX ? 'X' : 'O'

    setBoard(newBoard)
    setPlayerX(!playerX)
    setMoveHistory((prev) => {
      return ([...prev, { move: prev.length + 1, player: newBoard[index], position: [Math.floor(index / 3) + 1, (index % 3) + 1] }])
    })
  }

  const handleReset = () => {
    setBoard(Array(9).fill(null))
    setPlayerX(true)
    setMoveHistory([])
  }

  console.log(999999, { board, winner, scoreboard, moveHistory })
  return (
    <Box >
      <Typography variant="h4" fontWeight="bold">
        Tic Tac Toe
      </Typography>
      <Typography>
        {`Current Score: X: ${scoreboard.X} , O: ${scoreboard.O}`}
      </Typography>

      <Typography >
        {winner
          ? `🎉 Player ${winner} wins!`
          : isDraw
            ? "It's a draw!"
            : `Player ${playerX ? 'X' : 'O'}'s turn`}
      </Typography>

      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 1 }}></Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            flex: 1

          }}
        >
          {[0, 1, 2].map((row) => (
            <Box
              key={row}
              sx={{
                display: 'flex',
                gap: 1,
              }}
            >
              {[0, 1, 2].map((col) => {
                const index = row * 3 + col
                const cell = board[index]
                const isWinningCell =
                  winningItems?.includes(index)

                return (
                  <Box
                    key={index}
                    onClick={() => handleClick(index)}
                    sx={{
                      width: { xs: 80, sm: 100 },
                      height: { xs: 80, sm: 100 },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: isWinningCell
                        ? '#bbf7d0'
                        : 'white',
                      borderRadius: 2,
                      boxShadow: 1,
                      fontSize: 40,
                      fontWeight: 'bold',
                      color:
                        cell === 'X'
                          ? 'primary.main'
                          : 'error.main',
                      cursor:
                        cell || gameOver
                          ? 'default'
                          : 'pointer',
                      transition: 'background-color 0.2s',
                      '&:hover': {
                        bgcolor: isWinningCell
                          ? '#bbf7d0'
                          : cell || gameOver
                            ? 'white'
                            : '#e8edff',
                      },
                    }}
                  >
                    {cell}
                  </Box>
                )
              })}
            </Box>
          ))}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ flex: 1 }}>Move</Typography>
            <Typography sx={{ flex: 1 }}>Player</Typography>
            <Typography sx={{ flex: 1 }}>Position</Typography>
          </Box>
          {moveHistory.map((el) => <Box sx={{ display: "flex" }}>
            <Typography sx={{ flex: 1 }}>{el?.move}</Typography>
            <Typography sx={{ flex: 1 }}>{el?.player}</Typography>
            <Typography sx={{ flex: 1 }}>{`Row ${el?.position[0]} Col ${el?.position[1]}`}</Typography>
          </Box>)}
        </Box>
      </Box>




      {gameOver && (
        <Typography className="result-message">
          {winner
            ? `Congratulations, Player ${winner}!`
            : 'Good game! Try again.'}
        </Typography>
      )}

      <Button
        variant="contained"
        onClick={handleReset}
        sx={{ mt: 2, textTransform: 'none' }}
      >
        {gameOver ? 'Play Again' : 'Reset Game'}
      </Button>
    </Box>
  )
}
