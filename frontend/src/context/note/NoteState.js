import { useState } from 'react';
import NoteContext from './NoteContext';


// const NoteState = (props) => {
//     const state = {
//         "name": "nikhil",
//         "roll": "admin"
//     }
//     return (
//         <NoteContext.Provider value={state}>
//             {/* these state will be available to all components under NoteContext */}
//             {props.children}
//         </NoteContext.Provider>
//     );
// }


const NoteState = (props) => {
    const noteInitial = [
        { title: "hi dood", description: "okay fine good to go", tag: "todo" },
        { title: "hi chanky", description: "okay note 2", tag: "normal" },
        { title: "check my bio", description: "ogine i have no solution", tag: "personal" },
        { title: "hi dood", description: "okay fine good to go", tag: "todo" },
        { title: "hi chanky", description: "okay note 2", tag: "normal" },
        { title: "check my bio", description: "ogine i have no solution", tag: "personal" },
        { title: "hi dood", description: "okay fine good to go", tag: "todo" },
        { title: "hi chanky", description: "okay note 2", tag: "normal" },
        { title: "check my bio", description: "ogine i have no solution", tag: "personal" }
    ]
    const [notes, setNotes] = useState(noteInitial);

    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;