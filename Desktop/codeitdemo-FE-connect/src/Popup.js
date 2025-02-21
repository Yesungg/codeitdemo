import React, { useState } from 'react';

function Popup() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>추억 수정하기</button>
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <button onClick={() => setIsOpen(false)}>닫기</button>
            <h2>추억 수정</h2>
          </div>
        </div>
      )}
    </>
  );
}

export default Popup;