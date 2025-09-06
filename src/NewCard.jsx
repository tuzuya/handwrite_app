import React, { useRef, useState } from 'react';
import { supabase } from './lib/supabase';
import { v4 as uuidv4 } from 'uuid';
// 画像ファイルもimport（public/以下ならパス指定でもOK）
import card1 from './assets/fusen_circle.png';
import card2 from './assets/fusen_heart.png';
import card3 from './assets/fusen_square.png';
import card4 from './assets/fusen_star.png';
import Card from './Card';
import './NewCard.css';
// npm install react-signature-canvas
import SignatureCanvas from 'react-signature-canvas';

//書き込む際の色・太さ・枠の形の定義
const CARD_SHAPES = [
  { img: card1, name: 'circle' },
  { img: card2, name: 'heart' },
  { img: card3, name: 'square' },
  { img: card4, name: 'star' },
];
const COLORS = ['#000', '#e53e3e', '#3182ce', '#38a169'];
const COLOR_CLASSES = {
  '#000': 'color-black',
  '#e53e3e': 'color-red',
  '#3182ce': 'color-blue',
  '#38a169': 'color-green',
};
const THICKNESS_CLASSES = { 2: 'thick-2', 4: 'thick-4', 8: 'thick-8', 12: 'thick-12' };
const THICKNESS = [2, 4, 8, 12];

// タッチデバイスかどうかを判定する関数
const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

const NewCard = ({ onBack, onPostComplete }) => {
  const [description, setDescription] = useState('');
  const [selectedShape, setSelectedShape] = useState(CARD_SHAPES[0]);
  const [color, setColor] = useState(COLORS[0]);
  const [thickness, setThickness] = useState(THICKNESS[0]);
  const sigPad = useRef();

  //ローカル保存用の関数
  const handleSave = async () => {
    let desc = description;
    if (isTouchDevice() && sigPad.current) {
      desc = sigPad.current.getTrimmedCanvas().toDataURL('image/png');
    }
    // 保存処理（例：stateやAPI送信など）
    alert('保存しました');
    onBack();
  };

  //データベース保存用の関数
  const handleSaveToSupabase = async () => {
    //ここで投稿者のユーザidを取得
    const { data: userData } = await supabase.auth.getUser();
    const user_id = userData?.user?.id;
    if (!user_id) {
      alert('ユーザー情報が取得できません');
      return;
    }
    // ここでpostIdを生成
    const postId = uuidv4();
    //データベースのpostsテーブルのルールに基づいて、以下の三つは必ずnullなどで渡す
    let image_url = null;
    let image_width = null;
    let image_height = null;

    //Canvasから画像データ取得
    if (isTouchDevice() && sigPad.current) {
      //タッチデバイスの場合のみ画像アップロード
      const canvas = sigPad.current.getTrimmedCanvas();
      const dataUrl = canvas.toDataURL('image/png');
      const blob = await (await fetch(dataUrl)).blob();
      image_width = canvas.width;
      image_height = canvas.height;
      //Supabase Storageへ画像アップロード
      const filePath = `posts/${postId}.png`;
      const { data: storageRes, error: storageErr } =
        await supabase.storage.from('handwriting-posts').upload(filePath, blob);
      if (storageErr) {
        alert('画像保存失敗');
        return;
      }
      image_url = storageRes?.fullPath || filePath;

      //投稿データをDBへ
      const { error: dbErr } = await supabase.from('posts').insert({
        id: postId,
        user_id,
        image_url,
        image_width,
        image_height,
        description,
        shape: selectedShape.name,
        color,
        thickness,
        created_at: new Date().toISOString(),
      });
      if (dbErr) {
        alert('投稿保存失敗');
        return;
      } 
    } else {
      // テキストの場合は画像化せず、descriptionをそのまま保存
      const { error: dbErr } = await supabase.from('posts').insert({
        id: postId,
        user_id,
        image_url: null,
        image_width: null,
        image_height: null,
        description,
        shape: selectedShape.name,
        color,
        thickness,
        created_at: new Date().toISOString(),
      });
      if (dbErr) {
        alert('投稿保存失敗');
        return;
      }
    }

  //   // 2. 投稿IDを生成
  //   const postId = uuidv4();

  //   // 3. Supabase Storageへ画像アップロード
  //   const filePath = `posts/${postId}.png`;
  //   const { data: storageRes, error: storageErr } =
  //     await supabase.storage.from('handwriting-posts').upload(filePath, blob);
  //   if (storageErr) {
  //     alert('画像保存失敗');
  //     return;
  //   }
  //   image_url = storageRes?.fullPath || filePath;

  //   // 4. 投稿データをDBへ
  //   const { error: dbErr } = await supabase.from('posts').insert({
  //     id: postId,
  //     image_url,
  //     card_shape: selectedShape.name,
  //     color,
  //     thickness,
  //     created_at: new Date().toISOString(),
  //   });
  //   if (dbErr) {
  //     alert('投稿保存失敗');
  //     return;
  //   } 
    
  //   else {
  //   // PCなどはテキストをDBへ保存
  //   const postId = uuidv4();
  //   const { error: dbErr } = await supabase.from('posts').insert({
  //     id: postId,
  //     description: desc,
  //     created_at: new Date().toISOString(),
  //   });
  //   if (dbErr) {
  //     alert('投稿保存失敗');
  //     return;
  //   }
  // }

    // 投稿成功→一覧に即反映
    if (onPostComplete) onPostComplete();
    alert('Supabaseに保存しました');
    onBack();
  };

  return (
    <div className="newcard-wrapper">
      <div className="newcard-card">
        <h2 className="newcard-heading">新規カード作成</h2>

        <div className="newcard-toolbar">
          <div className="newcard-group" aria-label="枠の形選択">
            {CARD_SHAPES.map(shape => (
              <button
                key={shape.name}
                onClick={() => setSelectedShape(shape)}
                className={`newcard-shape-btn ${selectedShape.name === shape.name ? 'is-selected' : ''}`}
                aria-pressed={selectedShape.name === shape.name}
              >
                <img src={shape.img} alt={shape.name} className="newcard-shape-img" />
              </button>
            ))}
          </div>

          <div className="newcard-group" aria-label="色選択">
            {COLORS.map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`newcard-color-btn ${COLOR_CLASSES[c]} ${color === c ? 'is-selected' : ''}`}
                aria-pressed={color === c}
              />
            ))}
          </div>

          <div className={`newcard-group ${COLOR_CLASSES[color]}`} aria-label="太さ選択">
            {THICKNESS.map(t => (
              <button
                key={t}
                onClick={() => setThickness(t)}
                className={`newcard-thickness-btn ${thickness === t ? 'is-selected' : ''}`}
                aria-pressed={thickness === t}
              >
                <div className={`newcard-thickness-bar ${THICKNESS_CLASSES[t]}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="newcard-canvas-area">
          {isTouchDevice() ? (
            <SignatureCanvas
              ref={sigPad}
              penColor={color}
              minWidth={thickness}
              maxWidth={thickness}
              canvasProps={{ className: 'newcard-canvas', width: 320, height: 160 }}
            />
          ) : (
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="ここに投稿を入力"
              rows={6}
              className="newcard-textarea"
            />
          )}
        </div>

        <div className="newcard-actions">
          <button className="newcard-btn btn-secondary" onClick={handleSave}>ローカル保存</button>
          <button className="newcard-btn btn-primary" onClick={handleSaveToSupabase}>保存</button>
          <button className="newcard-btn btn-ghost" onClick={onBack}>戻る</button>
        </div>
      </div>
    </div>
  );
};

export default NewCard;
