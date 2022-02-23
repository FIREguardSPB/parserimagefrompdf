import './App.css';
import {useState} from "react";
import {
  Container
} from "./components/UIcomponents";
import parserFront from './Utils/parserFront.js'

function App() {
  const [data, setData] = useState(null)
  const onLoad = (e) => {
    try {
      const file = e.target.files[0]
      const reader = new FileReader();
      reader.addEventListener('load', (event) => {
        setData(event.target.result)
      });
      reader.addEventListener('error', (event) => {
        alert('Ошибка чтения файла')
      })
      if (file) {
        reader.readAsDataURL(file)
      }
    } catch (e) {
      console.log(e)
    }
  }
  // const onSend = async (e) => {
  // 	if (data) {
  // 		e.preventDefault();
  // 		await fetch('/api/upload', {
  // 			method: "POST",
  // 			// headers: {
  // 			// 	'Accept': 'data/*',
  // 			// 	'Content-Type': 'application/octet-stream'
  // 			// },
  // 			body: new FormData(e)
  // 		})
  // 	}
  // 	else {
  // 		alert('Выберите файл')
  // 	}
  // }
  
  // const OnSubmit = async (event) => {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   formData.append('file', data);
  //   await fetch("/api/upload", {
  //     method: 'POST',
  //     body: formData
  //   })
  // }
  const onLinkClick = async (e) => {
    try {
      await fetch('/api/clicked', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({action: 'click link'})
      })
    } catch (e) {
      console.log(e)
    }
  }
  const onButton =  (e) => {
    try {
      e.preventDefault()
      parserFront(data)
        .finally(() => {
          fetch('/api/clicked', {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({action: 'click on button'})
          })
        })
     
    } catch (e) {
      console.log(e)
    }
  }
  
  
  return (
    <>
      <Container>
        <br/>
        <a><b>Онлайн парсер изображений из PDF файлов</b></a>
        <br/>
        {/*<form onSubmit={OnSubmit}>*/}
        <input type='file' accept='.pdf' onChange={onLoad} name='file'/>
        {/*<input type="submit" value="Отправить"  /><br/>*/}
        {/*</form>*/}
        {data ? <button onClick={onButton} style={{'margin-top': '10px', 'align-item': 'center'}}>Найти и сохранить
          изображения</button> : null}
        <br/>
        <br/>
        <br/>
        by Sokolov A.A.
        <a href={'https://github.com/FIREguardSPB'} onClick={onLinkClick}>https://github.com/FIREguardSPB</a>
      </Container>
    </>
  );
}

export default App;
