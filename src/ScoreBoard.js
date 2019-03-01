import React from 'react';
import './App.css';

const ScoreBoard = ({ ai, aiWinCount, drawCount, playerWinCount, human }) => (
    <div className="score-board">
        <table className="score-table">
            <tbody>
                <tr>
                    <td>Player</td>
                    <td>({human})</td>
                    <td className="count">{playerWinCount}</td>
                </tr>
                <tr>
                    <td>Computer</td>
                    <td>({ai})</td>
                    <td className="count">{aiWinCount}</td>
                </tr>
                <tr>
                    <td>Draw</td>
                    <td></td>
                    <td className="count">{drawCount}</td>
                </tr>
            </tbody>
        </table>
    </div>
);

export default ScoreBoard;
