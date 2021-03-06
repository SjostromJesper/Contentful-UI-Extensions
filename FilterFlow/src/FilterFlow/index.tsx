import * as React from "react"
import { DialogExtensionSDK } from "contentful-ui-extensions-sdk";
import { IChart, FlowChart }  from '../ReactFlowChart'
import Node from './Node';
import Port from './Port';
import { FilterFlowContext, FlowContext } from "./FlowContext";
import EditOption from "./EditOption";
import AddNodes from "./AddNodes";
import config from "./misc/config";
import Line from "./Line";
import EditQuestion from "./EditQuestion";
import SaveOrClose from "./SaveOrClose";
import styled from 'styled-components'


interface FilterFlowProps {
    sdk: DialogExtensionSDK;
    chart?: IChart;
}

const FlowWrapper = styled.div`
    
`;




const FilterFlow: React.FunctionComponent<FilterFlowProps> = (props) => {

    return <FlowWrapper>
        <FilterFlowContext sdk={props.sdk} chart={props.chart}>
            <FlowContext.Consumer>
                {context =>
                <>
                    {context.editingOption == null ? null : <EditOption />}
                    {context.editingNodeQuestion == null ? null : <EditQuestion />}
                    <FlowChart 
                        chart={context.chart}
                        config={config}
                        Components={{
                            NodeInner: Node,
                            Port: Port,
                            Link: Line
                        }}
                        callbacks={context.defaultCallbacks}
                    />
                    <AddNodes />
                    <SaveOrClose />
                </>
            }
            </FlowContext.Consumer>
        </FilterFlowContext>
    </FlowWrapper>
}

export default FilterFlow;