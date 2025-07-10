// Filename: HakAksesForm-Guru.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Card } from '../../components/Molekul.jsx';
import { SuccessButton, SecondaryButton, DangerButton } from '../../components/Button.jsx';
import { iconList } from '../../data/iconData.js';
import { FormInput } from '../../components/Forms.jsx'

function HakAksesFormGuru() {
    const navigate = useNavigate();
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    const [successButtonHovering, setSuccessButtonHovering] = useState(false);
    const [dangerButtonHovering, setDangerButtonHovering] = useState(false);

    const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
    const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;

    const [formData, setFormData] = useState({
        username: '',
    });

    const handleReset = () => {
        // Logika reset password bisa ditambahkan di sini jika diperlukan
        alert("Password telah diubah menjadi default 'smpbabussalam'");
    };

    return (
        <div>
        <Header> Form Guru </Header>

        <main
            className="d-flex justify-content-center flex-wrap"
            style={{ gap: '20px' }}
        >
            <div className="d-flex flex-column align-items-start w-100 px-4" style={{ maxWidth: '1100px', paddingTop: '40px', }}>
                {/* Button Back */}
                <SecondaryButton
                    className="animate-button d-flex flex-row gap-2"
                    width="125px"
                    height="45px"
                    onClick={() => navigate(-1)}
                    onMouseEnter={() => setSecondaryButtonHovering(true)}
                    onMouseLeave={() => setSecondaryButtonHovering(false)}
                    style={{ 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        boxShadow: secondaryButtonHovering ? '6px 6px 12px rgba(0, 0, 0, 0.5)' : '2px 2px 8px rgba(0, 0, 0, 0.5)',
                        transition: 'box-shadow 0.2s ease-in-out',
                    }}
                >
                    <img
                        src={secondaryButtonHovering ? leftArrowYellow : leftArrowBlack}
                        alt="Back"
                        width="15"
                        height="15"
                        style={{ 
                            marginLeft: '4px',
                        }}
                    />

                    <span style={{ 
                        fontSize: '18px', 
                        color: secondaryButtonHovering ? '#FFC107' : '#000', 
                        marginLeft: '2px' 
                    }}
                    > 
                        Kembali 
                    </span>

                </SecondaryButton>
                
                {/* Form Profile */}
                <Card
                    style={{
                        width: '100%',
                        marginTop: '35px',
                        padding: '30px',
                    }}
                >
                    <div style={{ padding: '15px 35px 15px 35px' }}>

                        <h4 style={{ fontWeight: 'bold', color: '#379777', marginBottom: '25px' }}> FORM DATA GURU </h4>

                        <div className="row" style={{ rowGap: '16px' }}>
                            {[
                                ['Username', 'username'],
                            ].map(([label, name], index) => {
                                const isRequired = [
                                    'username', 
                                ].includes(name);
                                
                                return (
                                    <div className="col-md-12 col-sm-12" key={index}>
                                        <FormInput
                                            label={label}
                                            name={name}
                                            type='text'
                                            value={formData[name]}
                                            required={isRequired}
                                            placeholder={label}
                                            onChange={(e) =>
                                                setFormData((prev) => ({ ...prev, [name]: e.target.value }))
                                            }
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        
                        {/* Wrap Button Simpan & Reset */}
                        <div className="d-flex flex-row justify-content-center justify-content-md-end gap-4">
                            {/* Tombol Reset */}
                            <div className="d-flex justify-content-end mt-4">
                                <DangerButton
                                    className="d-flex align-items-center justify-content-center"
                                    width="200px"
                                    height="42px"
                                    style={{
                                        padding: '8px 28px',
                                        fontWeight: 'bold',
                                        fontSize: '15px',
                                        borderRadius: '6px',
                                        boxShadow: dangerButtonHovering
                                            ? '4px 4px 8px rgba(0, 0, 0, 0.5)'
                                            : '2px 2px 4px rgba(0, 0, 0, 0.5)',
                                        transition: 'box-shadow 0.2s ease-in-out',
                                    }}
                                    onMouseEnter={() => setDangerButtonHovering(true)}
                                    onMouseLeave={() => setDangerButtonHovering(false)}
                                    onClick={handleReset}
                                >
                                    RESET PASSWORD
                                </DangerButton>
                            </div>

                            {/* Tombol Simpan */}
                            <div className="d-flex justify-content-end mt-4">
                                <SuccessButton
                                    className="d-flex align-items-center justify-content-center"
                                    width="140px"
                                    height="42px"
                                    style={{
                                        padding: '8px 28px',
                                        fontWeight: 'bold',
                                        fontSize: '15px',
                                        borderRadius: '6px',
                                        boxShadow: successButtonHovering
                                            ? '4px 4px 8px rgba(0, 0, 0, 0.5)'
                                            : '2px 2px 4px rgba(0, 0, 0, 0.5)',
                                        transition: 'box-shadow 0.2s ease-in-out',
                                    }}
                                    onMouseEnter={() => setSuccessButtonHovering(true)}
                                    onMouseLeave={() => setSuccessButtonHovering(false)}
                                >
                                    SIMPAN
                                </SuccessButton>
                            </div>
                        </div>
                    </div>
                </Card>

            
            </div>
        </main>

        <footer>
            <small style={{ fontSize: '14px', color: '#808080' }}>
                Copyright &copy; {new Date().getFullYear()} SMP Plus Babussalam. All Rights Reserved.
            </small>
        </footer>
        </div>
    );
}

export default HakAksesFormGuru;