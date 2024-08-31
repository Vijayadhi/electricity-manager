import React, { useState } from 'react'
import calculateBill from '../Helper.js'
import TopBarComponet from './TopBarComponet.jsx';

function ContentWrapper() {
    const [pre_reading, set_pre_reading] = useState(0);
    const [curr_reading, set_curr_reading] = useState(0);

    let error = false

    if (Number(pre_reading) > curr_reading) {
        error = true
        //    const message = "Previous Reading always should lesser than the Current reading"
    }


    let [unitsConsumed, billAmount] = calculateBill(pre_reading, curr_reading);
    if (unitsConsumed < 0) {
        unitsConsumed = 0
    }

    return <>
    <TopBarComponet/>
        <br /><br />
        <div className="container container-fluid align-self-center text-align-center">
            <form action="" method="post" className="form-group forms">
                <div className="row g-3 align-items-center">
                    <div className="col text-start form-group">
                        <label for="last-name" className="col-form-label">Current Reading <span>*</span></label>
                        <input type="text" id="currentReading" className="form-control form-group"
                            placeholder="Enter Current Reading" onChange={e => set_curr_reading(e.target.value)} required />
                    </div>
                    <div className="col text-start form-group">
                        <label for="first-name" className="col-form-label">Previous Reading <span>*</span></label>
                        <input type="text" id="previousReading" className="form-control form-group"
                            placeholder="Enter Previous Reading" onChange={e => set_pre_reading(e.target.value)} required />

                        {error ? <><p style={{ color: "red", fontSize: "12px" }}>Previous Reading always should lesser than the Current reading</p></> : ""}
                    </div>

                </div>
                <br />
                <div className="row g-3 text-center">
                    <div className="col">
                        <button type="button" className="btn btn-primary" onClick={() => calculateBill(pre_reading, curr_reading)} id="submit"><i
                            className="fa-solid fa-calculator"></i>&nbsp;&nbsp;
                            <strong>Calcualate</strong></button>
                        {/* <button type="button" className="btn btn-primary" id="submit"><i
                            className="fa-solid fa-calculator"></i>&nbsp;&nbsp;
                            <strong>Calcualate</strong></button> */}
                    </div>
                </div>
                <br />
            </form>
            <div className="data text-center">
                <table className="table table-warning">
                    <thead>
                        <tr>
                            <th scope="col">Current Unit</th>
                            <th scope="col">Previous Units</th>
                            <th scope="col">Units Consumed</th>
                            <th scope="col">Cost</th>
                        </tr>
                    </thead>
                    <tbody id="userData">
                        <tr>
                            <td style={{ border: "2px solid black" }}>{curr_reading}</td>
                            <td style={{ border: "2px solid black" }}>{pre_reading}</td>
                            <td style={{ border: "2px solid black" }}>{unitsConsumed}</td>
                            <td style={{ border: "2px solid black" }}>
                                <i className="fa-solid fa-rupee"></i> {billAmount}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </>




}

export default ContentWrapper