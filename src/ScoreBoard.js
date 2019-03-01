import React from 'react';
import './App.css';

const ScoreBoard = ({ ai, aiWinCount, drawCount, playerWinCount, human }) => (
    <div className="score-board">
        <table className="score-table">
            <tbody>
                <tr>
                    <td><i className="fas fa-user"></i></td>
                    {human === 'X' 
                    ? <td className="blue piece">{human}</td>
                    : <td className="pink piece">{human}</td>}
                    <td>{playerWinCount}</td>
                </tr>
                <tr>
                    <td><i className="fas fa-robot"></i></td>
                    {ai === 'X' 
                    ? <td className="blue piece">{ai}</td>
                    : <td className="pink piece">{ai}</td>}
                    <td>{aiWinCount}</td>
                </tr>
                <tr>
                    <td><i className="fas fa-handshake"></i></td>
                    <td className="piece"></td>
                    <td>{drawCount}</td>
                </tr>
            </tbody>
        </table>
    </div>
);

export default ScoreBoard;
