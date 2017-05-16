import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    var existingNotesData = localStorage.getItem('notes');  //componentDidUpdate()하고 localStorage에 저장되어있는거 변수에 넣어줌
    this.state = {
      notebookName: '리액트 노트북',
      mode: 'VIEW',
      notes: existingNotesData
        ? JSON.parse(existingNotesData) //existingNotesData가 있으면 표시 없으면 밑으로
        : [
        { title: '안녕하세요, 노트를 적자...',
          content: '노트는 이렇게 적는다...' },
        { title: '안녕하세요, 노트를 적자...2',
          content: '노트는 이렇게... 이렇게...' },
        { title: '노트 입니다... 음',
          content: 'Lorem ipsum dolar sit amet.' },
      ],
    };
  }

  componentDidUpdate(){ //component가 변경이 있을 때마다 호출 (setState할때마다)
    localStorage.setItem('notes', JSON.stringify(this.state.notes));  //새 노트 추가하면(상태변경하면/원래있던거 클릭하면) localstorage에서 확인 가능 ->새로고침해도 그대로
  }
  
  insertNote() {
    var notes = this.state.notes;
    var newNoteIndex = notes.length;
    notes.push({
      title: '새 노트',
      content: '',
    });
    
    this.setState({
      notes: notes,
      activeNoteIndex: newNoteIndex,
      mode: 'EDIT'
    });
  }
  
  deleteNote(){
    var notes = this.state.notes;
    delete notes[this.state.activeNoteIndex]; //delete쓰면 그 자리는 undefined로 남아있음 -> filter사용 ( [5,4,3,2,1].filter(number => number>2) 하면 345만 들어감 map이랑 다름
    notes - notes.filter(item => item !== undefined); //undefined삭제됨
    
    this.setState({
      notes: notes,
      activeNoteIndex: null,  //delete하면 activeNoteIndex는 없는걸로..열려있는 노트 없음
    })
    //노트 선택하고 react에서 $r.deleteNote()하면 삭제됨
  }
  
  openNote(index) {
    this.setState({
      activeNoteIndex: index,
      mode: 'VIEW',
    });
  }

  updateTitle(title) {
    var notes = this.state.notes;
    notes[this.state.activeNoteIndex].title = title
    this.setState({
      notes: notes
    })
  }

  updateContent(content) {
    var notes = this.state.notes;
    notes[this.state.activeNoteIndex].content = content
    this.setState({
      notes: notes
    })
  }
  
  switchToEditMode() {
    this.setState({
      mode: 'EDIT'
    });
  }

  render() {
    var activeNote = this.state.notes[this.state.activeNoteIndex];

    return (
      <div>
        <div className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href='/'>{this.state.notebookName}</a>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <ul className="list-group">
                { this.state.notes.map((note, idx) => (
                  <li className={
                    'list-group-item ' + (note === activeNote ? 'active' : '')
                  }
                      onClick={() => this.openNote(idx)}>{note.title}</li>
                ))}
              </ul>
              <button
                  className='btn btn-default'
                  onClick={() => {this.insertNote()}}>
                + 새 메모 추가하기
              </button>
            </div>

            <div className="col-md-9">
            { this.state.mode === 'EDIT'
              ? <div>
                  <h3>새로운 메모</h3>
                  <div className="form-group">
                    <label className="col-xs-12 control-label">제목</label>
                    <div className="col-lg-10">
                      <input type="text" className="form-control" placeholder="제목"
                          onChange={(e) => this.updateTitle(e.target.value)}
                          value={activeNote.title}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-xs-12 control-label">내용</label>
                    <div className="col-lg-10">
                      <textarea className="form-control" rows="10"
                          onChange={(e) => this.updateContent(e.target.value)}
                          value={activeNote.content}
                      />
                    </div>
                  </div>
                </div>
              : <div>
                 {
                  activeNote
                  ? <div>
                      <div className="page-header">
                        <button className="btn btn-default pull-right"
                            onClick={() => this.switchToEditMode()}
                        >
                          수정
                        </button>
                        
                        <button className="btn btn-default pull-right"
                            onClick={() => this.deleteNote()}
                        >
                          삭제
                        </button>
                        <h2>{activeNote.title}</h2>
                      </div>
                      {activeNote.content}
                    </div>

                  : <h3>열려 있는 노트가 없습니다. 노트를 보려면 목록에서 선택해 주세요.</h3>
                }
                </div>
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;