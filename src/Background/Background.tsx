import * as React from 'react';

type IBackgroundProps = {
    gridSize?: number;
    backgroundFillId?: string;
};

export class Background extends React.Component<IBackgroundProps> {
    static defaultProps = {
        backgroundFillId: '#grid',
        gridSize: 40960
    };

    render() {
        const { gridSize, backgroundFillId } = this.props;
        return (
            <rect
                className="background"
                x={-(gridSize || 0) / 4}
                y={-(gridSize || 0) / 4}
                width={gridSize}
                height={gridSize}
                fill={`url(${backgroundFillId || ''})`}
            />
        );
    }
}