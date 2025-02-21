import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './Popup.css';

function MemoDel({ onClose }) {
  return (
    <div className="memo_del pop" id="memo_del">
      <div className="memo_del popup">
        <div className="memo_del header">
          <span className="back2 btn" onClick={onClose}>&times;</span>
          <h2>추억 삭제</h2>
        </div>
        <div className="memo_del body">
          <div className="delete box">
            <label for="delete_permission">삭제 권한 인증</label>
            <input id="delete_permission" name="delete" type="password" placeholder="추억 비밀번호를 입력해주세요." />
          </div>
          <button className="del popbtn">삭제하기</button>
        </div>
      </div>
    </div>
  );
}

export default MemoDel;