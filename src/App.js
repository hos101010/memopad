import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notebookName: '리액트 노트북',
      mode: 'VIEW',
      notes: [
        { title: '안녕하세요, 노트를 적자...',
          content: '노트는 이렇게 적는다...' },
        { title: '안녕하세요, 노트를 적자...2',
          content: '노트는 이렇게... 이렇게...' },
        { title: '노트 입니다... 음',
          content: 'Lorem ipsum dolar sit amet.' },
      ],
    };
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