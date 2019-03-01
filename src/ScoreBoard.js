import React from 'react';
import './App.css';

const ScoreBoard = ({ ai, aiWinCount, drawCount, playerWinCount, human }) => (
    <div className="score-board">
        <table className="score-table">
            <tbody>
                <tr>
                    <td><i className="fas fa-user"></i></td>
                    <td className="piece">{human}</td>
                    <td>{playerWinCount}</td>
                </tr>
                <tr>
                    <td><i className="fas fa-robot"></i></td>
                    <td className="piece">{ai}</td>
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
