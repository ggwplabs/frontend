import React from 'react';
import cl from "./EpochCards.module.css";
import ActualEpoch from "./ActualEpoch";
import Epoch from "./Epoch";

const EpochCards = ({info}) => {

    const Actualepoch =  (((Date.now() / 1000 | 0) - info.startTime) / (info.epochPeriodDays * 86400)  | 0) + 1
    const cards = [];

    const getAprByEpoch = (epoch, startApr, stepApr, endApr) => {
        const currentApr = startApr - (stepApr * (epoch - 1))
        return currentApr < endApr ? endApr : currentApr
    }

    switch (Actualepoch) {
        case 1: {
            cards.push(
                <ActualEpoch
                    key={0}
                    epoch={Actualepoch}
                    start={info.startTime}
                    end={info.startTime + (info.epochPeriodDays * 86400)}
                    apr={getAprByEpoch(Actualepoch, info.aprStart, info.aprStep, info.aprEnd)}
                />
            )
            for (let i = 1; i < 5; i++) {
                cards.push(
                    <Epoch
                        key={i}
                        epoch={i + 1}
                        isFuture={true}
                        time={info.startTime + (info.epochPeriodDays * 86400) * i}
                        apr={getAprByEpoch(Actualepoch + i, info.aprStart, info.aprStep, info.aprEnd)}
                    />
                )
            }
            break;
        }
        case 2: {
            cards.push(
                <Epoch
                    key={0}
                    epoch={1}
                    isFuture={false}
                    time={info.startTime + (info.epochPeriodDays * 86400)}
                    apr={getAprByEpoch(1, info.aprStart, info.aprStep, info.aprEnd)}
                />
            )
            cards.push(
                <ActualEpoch
                    key={1}
                    epoch={Actualepoch}
                    start={info.startTime + (info.epochPeriodDays * 86400)}
                    end={info.startTime + ((info.epochPeriodDays * 86400) * 2)}
                    apr={getAprByEpoch(Actualepoch, info.aprStart, info.aprStep, info.aprEnd)}
                />
            )
            for (let i = 2; i < 5; i++) {
                cards.push(
                    <Epoch
                        key={i}
                        epoch={i + 1}
                        isFuture={true}
                        time={info.startTime + (info.epochPeriodDays * 86400) * (i + 1)}
                        apr={getAprByEpoch(i + 1, info.aprStart, info.aprStep, info.aprEnd)}
                    />
                )
            }
            break;
        }
        default: {
            for (let i = Actualepoch - 2; i < Actualepoch + 3; i++) {
                if (i === Actualepoch) {
                    cards.push(
                        <ActualEpoch
                            key={i}
                            epoch={i}
                            start={info.startTime + ((info.epochPeriodDays * 86400) * (i - 1))}
                            end={info.startTime + ((info.epochPeriodDays * 86400) * i)}
                            apr={getAprByEpoch(i, info.aprStart, info.aprStep, info.aprEnd)}
                        />
                    )
                } else if (i < Actualepoch) {
                    cards.push(
                        <Epoch
                            key={i}
                            epoch={i}
                            isFuture={false}
                            time={info.startTime + (info.epochPeriodDays * 86400 * i)}
                            apr={getAprByEpoch(i, info.aprStart, info.aprStep, info.aprEnd)}
                        />
                    )
                } else {
                    cards.push(
                        <Epoch
                            key={i}
                            epoch={i}
                            isFuture={true}
                            time={info.startTime + (info.epochPeriodDays * 86400 * (i - 1))}
                            apr={getAprByEpoch(i, info.aprStart, info.aprStep, info.aprEnd)}
                        />
                    )
                }
            }
        }
            break;
    }
    return (
        <div className={cl.Epoch_list}>
            {cards}
        </div>
    );
};

export default EpochCards;