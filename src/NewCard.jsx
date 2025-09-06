import React, { useRef, useState } from 'react';
import Card from './Card';
// npm install react-signature-canvas
import SignatureCanvas from 'react-signature-canvas';

// タッチデバイスかどうかを判定する関数
const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

const NewCard = ({ onBack }) => {
  const [description, setDescription] = useState('');
  const sigPad = useRef();

  const handleSave = () => {
    let desc = description;
    if (isTouchDevice() && sigPad.current) {
      desc = sigPad.current.getTrimmedCanvas().toDataURL('image/png');
    }
    // 保存処理（例：stateやAPI送信など）
    alert('保存しました');
    onBack();
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>新規カード作成</h2>
      {isTouchDevice() ? (
        <SignatureCanvas
          ref={sigPad}
          penColor="black"
          canvasProps={{ width: 300, height: 150, className: 'sigCanvas' }}
        />
      ) : (
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="ここに説明を入力"
          rows={6}
          style={{ width: 300 }}
        />
      )}
      <br />
      <button onClick={handleSave}>保存</button>
      <button onClick={onBack}>戻る</button>
    </div>
  );
};

export default NewCard;