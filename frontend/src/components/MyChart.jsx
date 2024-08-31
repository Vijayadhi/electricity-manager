import React from 'react'
import { VictoryBar, VictoryChart, VictoryPie } from 'victory';

function MyChart() {
    const data = [
        { quarter: 1, earnings: 13000 },
        { quarter: 2, earnings: 16500 },
        { quarter: 3, earnings: 14250 },
        { quarter: 4, earnings: 19000 }
    ];
    return (
        <>
            <section className="content" >
                {/* <h3 style={{ fontSize: 50 + "px", alignContent: "start" }}>Line Chart</h3> */}
                <div className="container-fluid bg-light" style={{ height: 500 + "px", paddingLeft: 100 + "px", alignItems: "center", width: 1080 + "px", height: 1920 + "px" }}>
                    <div className="row" style={{ height: 150 + "px", alignItems: "start", width: 850 + "px" }}>
                        <div className="col-md-6">
                            {/* <div style={{height:500+"px", alignItems: "start"}}> */}
                            <br />
                            <VictoryChart>
                                <VictoryBar
                                    data={data}
                                    x="quarter"
                                    y="earnings"
                                    width={1500}
                                    colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
                                />
                            </VictoryChart>


                        </div>
                        <div className='col-md-5'><VictoryPie
                            data={[
                                { x: "Cats", y: 35 },
                                { x: "Dogs", y: 40 },
                                { x: "Birds", y: 55 }
                            ]}
                            animate={{
                                duration: 2000
                            }}
                            colorScale={["tomato", "orange", "gold", "cyan", "navy"]}

                        /></div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default MyChart