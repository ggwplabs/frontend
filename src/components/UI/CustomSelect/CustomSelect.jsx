import React, {useState} from 'react';
import classes from './CustomSelect.module.css'
import {ReactComponent as Up} from "../../../images/UI/select/up.svg";
import {ReactComponent as Down} from "../../../images/UI/select/down.svg";

const CustomSelect = ({items, selectedItem, setSelectedItem}) => {

    const [isActive, setIsActive] = useState(false)

    React.useEffect(() => {
        const onClick = e => {
            if(!rootEl.current.contains(e.target)) {
                setIsActive(false)
            } else {
                setIsActive(!isActive)
            }
        }
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    const rootEl = React.useRef(null);

    return (
        <div>
            <div className={classes.select__container}>
                <div
                    className={classes.select__selected_item}
                >
                    {selectedItem.name}
                </div>
                <div
                    className={classes.select__arrow}
                    ref={rootEl}
                >
                    <div
                        className={classes.select__arrow_img}
                    >
                        {isActive
                            ? <Up/>
                            : <Down/>
                        }
                    </div>
                </div>
            </div>
            <div
                style={{display: isActive ? "block" : "none"}}
                className={classes.select__items_list}
            >
                {items.map(item => (
                    <div
                        key={item.id}
                        onClick={() => {
                            setSelectedItem(item)
                            setIsActive(!isActive)
                        }}
                        className={classes.select__item}
                    >
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomSelect;