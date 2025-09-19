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

// タッチデバイスかどうかを判定する
//この二つは関数ではなく、webに初めから用意されているプロパティ
const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

const NewCard = ({ onBack, onPostComplete }) => {
  const [description, setDescription] = useState('');
  const [selectedShape, setSelectedShape] = useState(CARD_SHAPES[0]);
  const [color, setColor] = useState(COLORS[0]);
  const [thickness, setThickness] = useState(THICKNESS[0]);
  //useRefでsigPadの最新の状態を取得できるようにしている
  //なお、sigPadは手書き入力のライブラリsignature_padを省略してかいたもの
  const sigPad = useRef();

  //ローカル保存用の関数
  const handleSave = async () => {
    let desc = description;
    if (isTouchDevice() && sigPad.current) {
      //getTrimmedCanvasは、signature_padのメソッドで、手書き部分の書いた部分のみを切り取ったcanvasを返す
      desc = sigPad.current.getTrimmedCanvas().toDataURL('image/png');
    }
    // 保存処理（例：stateやAPI送信など）
    alert('保存しました');
    onBack();
  };

  //データベース保存用の関数
  const handleSaveToSupabase = async () => {
    //ここで投稿者のユーザidを取得
    //supabase上のdataプロパティの中の複数の情報をまとめて分割代入でuserDataに入れている
    const { data: userData } = await supabase.auth.getUser();
    //userDataの中から、ユーザIDを取り出す
    //ただし、?.（オプショナルチェイニング）を使って、安全にアクセスしている
    //?.にすると、途中でnullやundefinedがあってもエラーにならず、undefinedを返す
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
      let canvas = null;//debug
      console.log(sigPad.current);//debug
      //タッチデバイスの場合のみ画像アップロード
      // getTrimmedCanvasが存在すれば使う、なければgetCanvasを使う
      if (typeof sigPad.current.getTrimmedCanvas === 'function') {
        canvas = sigPad.current.getTrimmedCanvas();
        console.log("getTrimmedCanvasが使われました");//debug
        // const dataUrl = canvas.toDataURL('image/png');
        // blob = await (await fetch(dataUrl)).blob();
        // image_width = canvas.width;
        // image_height = canvas.height;
        // const filePath = `posts/${postId}.png`;
        // const { data: storageRes, error: storageErr } =
        // await supabase.storage.from('handwriting-images').upload(filePath, blob);
        // if (storageErr) {
        // alert('画像保存失敗');
        // return;
        // }
        // image_url = storageRes?.fullPath || filePath;

        // //投稿データをDBへ
        // const { error: dbErr } = await supabase.from('posts').insert({
        // id: postId,
        // user_id,
        // image_url,
        // image_width,
        // image_height,
        // description,
        // shape: selectedShape.name,
        // color,
        // thickness,
        // created_at: new Date().toISOString(),
        // });
        // if (dbErr) {
        //   alert('投稿保存失敗');
        //   return;
        // }
      } else if (typeof sigPad.current.getCanvas === "function") {
        canvas = sigPad.current.getCanvas();
        console.log("getCanvasが使われました");//debug
      } else {
        alert('手書きキャンバスが利用できません');
        return;
      }

      if (!canvas) {
        alert('手書きキャンバスが取得できません');
        return;
      }
      console.log("canvas:", canvas);//debug
      const dataUrl = canvas.toDataURL('image/png');
      window.open(dataUrl); // これで新しいタブに画像が表示される
      console.log("dataUrl:", dataUrl);//debug
      const blob = await (await fetch(dataUrl)).blob();
      console.log("blob:", blob);//debug
      console.log("blob.size:", blob.size);//debug

      if(!blob || blob.size === 0) {
        alert("画像が空です。何を書いたか確認してください。");
        return;
      }

      image_width = canvas.width;
      image_height = canvas.height;
      const filePath = `posts/${user_id}/${postId}.png`;
      const { data: storageRes, error: storageErr } =
        await supabase.storage.from('handwriting-images').upload(filePath, blob);
      if (storageErr) {
        alert('画像保存失敗：取得エラー');
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
        alert('投稿保存失敗：送信エラー');
        return;
      }
    } else {
      // テキストの場合は画像化せず、descriptionをそのまま保存
      //desctiptionはhtml部分のtextareaで入力されたもの
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
                //Reactは見た目の変化を必ず状態の変化として扱うので、classNameの変化も状態の変化から自動で発火されるべきなので、
                //三項演算子でis-selectedを付与するかどうかを決めている
                //同じ理由で、ReactでclassNameの付与をonClickで直接変えるのはNG
                className={`newcard-shape-btnd ${selectedShape.name === shape.name ? 'is-selected' : ''}`}
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
                //色ごとにボタンの色を変化させたいので、classNameにCOLOR_CLASSES[c]を追加してcss側で色を指定している
                className={`newcard-color-btn ${COLOR_CLASSES[c]} ${color === c ? 'is-selected' : ''}`}
                //setColor関数でcolorの状態が変わると、c === colorという条件を満たすc（４択）のみ、aria-pressedがtrueになる
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
              //テキストエリアに表示される内容は常にvalueの中身と同期している
              value={description}
              // onChangeイベントでvalueの中身を更新する
              //ここのonChangeは、テキストエリアに新しい書き込みが入力されるたびに発火する
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