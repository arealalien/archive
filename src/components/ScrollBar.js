import React, { forwardRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

const ScrollBar = forwardRef((props, ref) => {

    const handleUpdate = (values) => {
        const { top } = values;
        if (props.onUpdate) {
            props.onUpdate(top);
        }
    };

    const renderView = ({ style, ...props }) => {
        const customStyle = {
            // Add any custom styles for the view here
        };
        return (
            <div {...props} style={{ ...style, ...customStyle }} />
        );
    };

    const renderThumb = ({ style, ...props }) => {
        const thumbStyle = {
            backgroundColor: `rgba(255, 255, 255, .3)`,
            borderRadius: `5em`,
        };
        return (
            <div
                style={{ ...style, ...thumbStyle }}
                {...props} />
        );
    };

    return (
        <Scrollbars
            universal
            ref={ref} // Forward the ref to the Scrollbars component
            renderView={renderView}
            renderThumbHorizontal={renderThumb}
            renderThumbVertical={renderThumb}
            onUpdate={handleUpdate}
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            {...props} // Spread the rest of the props
        />
    );
});

export default ScrollBar;