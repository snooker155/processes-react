import * as React from 'react';
import {Circle} from "../Circle";

type IBackgroundPatternProps = {
    gridSpacing?: number;
    gridDotSize?: number;
};

export class BackgroundPattern extends React.Component<IBackgroundPatternProps> {
    render() {
        const { gridSpacing, gridDotSize } = this.props;

        return (
            <pattern id="grid" key="grid" width={gridSpacing} height={gridSpacing} patternUnits="userSpaceOnUse">
                {/*<polygon points="0,0 2,5 0,10 5,8 10,10 8,5 10,0 5,2"/>*/}
                <circle className="circle" cx={(gridSpacing || 0) / 2} cy={(gridSpacing || 0) / 2} r={gridDotSize} />
            </pattern>
        );
    }
}