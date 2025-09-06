import React, { useRef, useState } from 'react';
import { supabase } from './lib/supabase';
import { v4 as uuidv4 } from 'uuid';
// 画像ファイルもimport（public/以下ならパス指定でもOK）
import card1 from './assets/fusen_circle.png';
import card2 from './assets/fusen_heart.png';
import card3 from './assets/fusen_square.png';
import card4 from './assets/fusen_star.png';
import Card from './Card';
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
    <div style={{ padding: 24 }}>
      <h2>新規カード作成</h2>
      {/* 形・色・太さの選択UIは省略（必要なら追加） */}
      <div>
  {/* 枠の形選択 */}
  <div>
    {CARD_SHAPES.map(shape => (
      <button
        key={shape.name}
        onClick={() => setSelectedShape(shape)}
        style={{
          border: selectedShape.name === shape.name ? '2px solid #3182ce' : '1px solid #ccc',
          margin: 4,
          background: 'none'
        }}
      >
        <img src={shape.img} alt={shape.name} width={32} height={32} />
      </button>
    ))}
  </div>
  {/* 色選択 */}
  <div>
    {COLORS.map(c => (
      <button
        key={c}
        onClick={() => setColor(c)}
        style={{
          background: c,
          border: color === c ? '2px solid #3182ce' : '1px solid #ccc',
          width: 24,
          height: 24,
          borderRadius: '50%',
          margin: 4
        }}
      />
    ))}
  </div>
  {/* 太さ選択 */}
  <div>
    {THICKNESS.map(t => (
      <button
        key={t}
        onClick={() => setThickness(t)}
        style={{
          border: thickness === t ? '2px solid #3182ce' : '1px solid #ccc',
          margin: 4,
          padding: 4
        }}
      >
        <div style={{
          width: 24,
          height: t,
          background: color,
          margin: '0 auto'
        }} />
      </button>
    ))}
  </div>
</div>
      {isTouchDevice() ? (
        <SignatureCanvas
          ref={sigPad}
          penColor={color}
          minWidth={thickness}
          maxWidth={thickness}
          canvasProps={{ width: 300, height: 150, className: 'sigCanvas' }}
        />
      ) : (
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="ここに投稿を入力"
          rows={6}
          style={{ width: 300 }}
        />
      )}
      <br />
      <button onClick={handleSave}>ローカル保存</button>
      <button onClick={handleSaveToSupabase}>Supabaseに保存</button>
      <button onClick={onBack}>戻る</button>
    </div>
  );
};

export default NewCard;