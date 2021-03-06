import { FlowContext } from "./FlowContext";
import React from "react";
import styled from "styled-components";
import { TextInput, Button, TextLink } from "@contentful/forma-36-react-components";
import Entry from "./Entry";

const EditQuestionContainer = styled.div`

    position: fixed;
    top: 0px;
    left: 0px;
    background-color: #fff;
    z-index: 10;
    width: 100%;
    padding: 0px 15px 15px 15px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px #888;


    .entrylink{
        margin-top: 10px;
    }

`
const ActionsWrapper = styled.div`
    margin-top: 20px;

    .save{
        margin-right: 10px;
    }

`

const Label = styled.span`
    font-size: 14px;
    line-height: 24px;
    color: #8091a5;
    margin-top: 10px;
`

const EditQuestion: React.FunctionComponent = () => {
    
    var context = React.useContext(FlowContext);
    const [text, setText] = React.useState(context.editingNodeQuestion!.properties.question)
    const [explanationEntry, setExplanationEntry] = React.useState(context.editingNodeQuestion!.properties.explanationEntry)
    const [taxonomiEntry, setTaxonomiEntry] = React.useState(context.editingNodeQuestion!.properties.taxonomiEntry)
    
    
    const questionRef = React.createRef<HTMLInputElement>();
    React.useEffect(() => {
        if(questionRef.current != null)
            questionRef.current.focus()
    },[])


    return <EditQuestionContainer>
        <h2>Redigera fråga:</h2>
        <TextInput id="text" name="text" width="full" inputRef={questionRef} placeholder="Alternativ" value={text} onChange={(e)=> {
            setText(e.target.value);
        }} />

        {
            explanationEntry == null ?
            <TextLink onClick={() => {
                context.openNodeExplanationTextEntryDialog((entry: any) => {
                    setExplanationEntry(entry.sys)
                })
            }} className="entrylink" icon={"Link"}>Välj förklaringstext</TextLink>
            :
            <>
            <Label>Förklaringstext:</Label>
            <Entry sys={explanationEntry} onRemove={() => {
                setExplanationEntry(null);
            }} />
            </>
        }


        

        {taxonomiEntry == null ?
            <TextLink onClick={() => {
                context.openNodeTaxonomiEntryDialog((entry:any)=> {
                    setTaxonomiEntry(entry.sys)
                })
            }} className="entrylink" icon={"Link"}>Välj taxonomi?</TextLink>
            :
            <>
                
                <Label>Taxonomi:</Label>
                <Entry sys={taxonomiEntry} onRemove={() => {
                    setTaxonomiEntry(null);
                }} />
            </>
        }

        

        <ActionsWrapper>
            <Button buttonType="positive" className="save" onClick={
                () => {
                    const node = context.editingNodeQuestion!;
                    node.properties.question = text;
                    node.properties.explanationEntry = explanationEntry;
                    node.properties.taxonomiEntry = taxonomiEntry;
                    context.saveNodeQuestion(node);
                }
            }>Spara</Button>

            <Button buttonType="negative" className="cancel" onClick={() => {
                context.editNodeQuestion(null)
            }}>Avbryt</Button>
        </ActionsWrapper>

    </EditQuestionContainer>;
     
};

export default EditQuestion;