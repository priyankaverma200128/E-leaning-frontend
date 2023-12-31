import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import Apiservices from "../layout/Apiservices"
import { useNavigate } from "react-router-dom"
import { RingLoader } from "react-spinners"

export default function ShowQuiz() {
    const nav = useNavigate()
    const [isBtn, setIsBtn] = useState(false)
    const [load, setload] = useState(true)
    const obj = {
        position: "absolute",
        top: "300px",
        left: "50%",
        zIndex: 1,
    }

    const history = useNavigate();

    const [data, setData] = useState([])
    const getData = () => {
        Apiservices.ShowQuiz(data)
            .then((res) => {
                console.log(res.data.data);
                toast.success(res.data?.message)
                setData(res.data.data)
                setload(false)

            })
            .catch((err) => {
                console.error(err);
                toast.error("Something went wrong!!");
                setload(false)
            })
    }
    useEffect(
        () => {
            getData();
        }, [load]
    )
    const deleteData = (id) => {
        setIsBtn(true)
        let data = {
            _id: id
        }
        Apiservices.DeleteQuiz(data).then(
            (res) => {
                toast.success(res.data.message)
                nav("/admin/showquiz")
            }
        ).catch(
            (err) => {
                toast.error("Something went Wrong")
                setIsBtn(false)
            }
        )
    }
    return (
        <>
        { load == true && <RingLoader size={100} loading={load} cssOverride={obj} />}
            <div className={load == true ? "disable-screen " : " "}>
            {/* Heading starts here */}
            <div className="my-4 mt-4" style={{ backgroundColor: "#0a0f18", color: "white", height: "80px", paddingTop: "10px" }}>
                <h1>All Quiz</h1>
            </div>

            <div className="container my-4 mt-4">
            <div class="table-responsive">
                <table className="table table-striped table-hover table-bordered">
                    <thead>
                        <tr className="table-dark">
                            <th scope="col">S. No.</th>
                            <th scope="col">Title</th>
                            <th scope="col">No. of question</th>
                            <th scope="col">Delete</th>
                            <th scope="col">Edit</th>
                        </tr>
                    </thead>
                    <tbody>


                        {data?.map((e, index) => {
                            return <tr key={e._id}>
                                <td>{index + 1}</td>
                                <td>{e?.title}</td>
                                <td>{e?.numberofQuestion}</td>

                                <td>
                                    <Link to={"/admin/deletequiz/" + e?._id}>
                                    <i className="btn btn-lg text-danger bi bi-trash-fill " style={{ fontWeight: 'bold',fontSize: "40px",alignItems:'start',justifyContent:'start' }} onClick={() => { deleteData(e?._id) }} ></i>
                                    </Link>
                                </td>

                                <td>
                                    <Link to={"/admin/Updatequiz/"+ e?._id + "/"+ e?.courseid+ "/"+ e?.branchid}>
                                    <i  className="fa fa-edit text-success fa-2x" style={{'alignItems':'start','justifyContent':'start'}}></i>
                                    </Link>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
                </div>
                </div>

            </div>


        </>
    )
}