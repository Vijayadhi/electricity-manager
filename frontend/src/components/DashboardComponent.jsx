import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VictoryBar, VictoryChart, VictoryPie, VictoryTheme, VictoryLabel } from 'victory';
import { fetchbills } from '../redux/billSlice';
import { fetchBuildings } from '../redux/buildingSlice';
import TopBarComponet from './TopBarComponet';

function MyChart() {
    const dispatch = useDispatch();

    const { billData } = useSelector((state) => state.bills);
    const { buildingData } = useSelector((state) => state.buildings);

    useEffect(() => {
        dispatch(fetchbills());
        dispatch(fetchBuildings());
    }, [dispatch]);

    // Process data for VictoryPie
    const pieData = buildingData.map((building) => {
        const totalUnits = billData
            .filter(bill => bill.meter === building.id)
            .reduce((sum, bill) => sum + bill.units_consumed, 0);

        return { x: building.name, y: totalUnits };
    });

    // Process data for VictoryBar
    const barData = billData.map((bill) => ({
        quarter: bill.meter, // You may want to adjust this key depending on your data
        earnings: bill.bill_amount,
    }));

    return (
        <>
            <TopBarComponet />
            <section className="content">
                <div className="container-fluid bg-light" style={{ padding: '20px', width: '100%', maxWidth: '1080px' }}>
                    <div className="row">
                        <div className="col-md-6">
                            <VictoryChart theme={VictoryTheme.material}
                                domainPadding={10}>

                                <VictoryBar

                                    data={barData}
                                    x="quarter"
                                    y="earnings"
                                    width={1080}
                                    // cornerRadius={{ topLeft: ({ data }) => data.x * 4 }}
                                    style={{ data: { fill: "#c43a31" } }}
                                    alignment="start"
                                    animate={{
                                        duration: 2000,
                                        onLoad: { duration: 1000 }
                                    }}
                                    name="series-1"
                                    labels={({ datum }) => `${datum.x}: ${datum.y} units`}
                                    labelComponent={<VictoryLabel dy={30} />}

                                />
                            </VictoryChart>
                        </div>
                        <div className="col-md-5">
                            <VictoryPie
                                data={pieData}
                                animate={{
                                    duration: 2000
                                }}
                                colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default MyChart;
