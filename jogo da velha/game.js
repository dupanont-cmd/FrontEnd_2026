import React, { useState, StrictMode } from "https://esm.sh/react";
import { createRoot } from "https://esm.sh/react-dom/client";

// ── Componente Square ──────────────────────────────────────
function Square({ value, onSquareClick, highlight }) {
    return React.createElement("button", {
        className: "square" + (highlight ? " square-win" : ""),
        onClick: onSquareClick
    }, value);
}

// ── Componente Board ───────────────────────────────────────
function Board({ xIsNext, squares, onPlay }) {

    function handleClick(i) {
        if (calcularVencedor(squares) || squares[i]) return;
        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? "X" : "O";
        onPlay(nextSquares);
    }

    const resultado    = calcularVencedor(squares);
    const linhaVitoria = resultado ? resultado.linha : [];

    let status;
    if (resultado) {
        status = "Vencedor: " + resultado.vencedor;
    } else if (squares.every(Boolean)) {
        status = "Empate!";
    } else {
        status = "Vez de: " + (xIsNext ? "X" : "O");
    }

    const rows = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];

    return React.createElement("div", null,
        React.createElement("div", { className: "status" }, status),
        rows.map((row, ri) =>
            React.createElement("div", { key: ri, className: "board-row" },
                row.map(i =>
                    React.createElement(Square, {
                        key: i,
                        value: squares[i],
                        onSquareClick: () => handleClick(i),
                        highlight: linhaVitoria.includes(i)
                    })
                )
            )
        )
    );
}

// ── Componente Game ────────────────────────────────────────
function Game() {
    const [history, setHistory]  = useState([Array(9).fill(null)]);
    const [currentMove, setMove] = useState(0);

    const xIsNext   = currentMove % 2 === 0;
    const currentSq = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setMove(nextHistory.length - 1);
    }

    function jumpTo(move) {
        setMove(move);
    }

    const moves = history.map((_, move) => {
        const descricao = move === 0 ? "Ir para o início" : "Ir para jogada #" + move;
        return React.createElement("li", { key: move },
            React.createElement("button", { onClick: () => jumpTo(move) }, descricao)
        );
    });

    return React.createElement("div", { className: "game" },
        React.createElement("div", { className: "game-board" },
            React.createElement(Board, { xIsNext, squares: currentSq, onPlay: handlePlay })
        ),
        React.createElement("div", { className: "game-info" },
            React.createElement("h2", null, "Histórico"),
            React.createElement("ol", null, moves)
        )
    );
}

// ── Calcular vencedor ──────────────────────────────────────
function calcularVencedor(squares) {
    const linhas = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const [a, b, c] of linhas) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { vencedor: squares[a], linha: [a, b, c] };
        }
    }
    return null;
}

// ── Montar no DOM ──────────────────────────────────────────
const root = createRoot(document.getElementById("root"));
root.render(
    React.createElement(StrictMode, null,
        React.createElement(Game)
    )
);
