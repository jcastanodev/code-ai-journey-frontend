import { BaseLayout } from "@layouts/BaseLayout";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import "../styles/LandingStyle.css";
import { useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import React from "react";
import { Container } from "tsparticles-engine/types/export-types";

interface Props {
	children: React.ReactNode;
}
export const LandingLayout = ({ children }: Props) => {const isDarkMode = useAppSelector((state) => state.appSetting.isDarkMode);
        const [particlesColor, setParticlesColor] = React.useState('#999999');
        const particlesInit = async (main) => {
            await loadFull(main);
        };

        const particlesLoaded = async (container?: Container | undefined) => {
            console.log("Particles loaded");
        };

        useEffect(() => {
            console.log(isDarkMode);
            if (isDarkMode) {
                setParticlesColor("#ffffff");
            } else {
                setParticlesColor("#000000");
            }
        }, [isDarkMode])

        return (
            <BaseLayout>
                <div className="w-full h-full relative">
                    <Particles
                        id="tsparticles"
                        init={particlesInit}
                        loaded={particlesLoaded}
                        options={{
                            fpsLimit: 120,
                            interactivity: {
                                events: {
                                    onClick: {
                                        enable: true,
                                        mode: "push"
                                    },
                                    onHover: {
                                        enable: true,
                                        mode: "repulse"
                                    },
                                    resize: true
                                },
                                modes: {
                                    push: {
                                        quantity: 4
                                    },
                                    repulse: {
                                        distance: 200,
                                        duration: 0.4
                                    }
                                }
                            },
                            particles: {
                                color: {
                                    value: particlesColor
                                },
                                links: {
                                    color: particlesColor,
                                    distance: 150,
                                    enable: true,
                                    opacity: 0.5,
                                    width: 1
                                },
                                collisions: {
                                    enable: true
                                },
                                move: {
                                    direction: "none",
                                    enable: true,
                                    outModes: {
                                        default: "bounce"
                                    },
                                    random: false,
                                    speed: 1,
                                    straight: false
                                },
                                number: {
                                    density: {
                                        enable: true,
                                        area: 800
                                    },
                                    value: 80
                                },
                                opacity: {
                                    value: 0.5
                                },
                                shape: {
                                    type: "circle"
                                },
                                size: {
                                    value: { min: 1, max: 5 }
                                }
                            },
                            detectRetina: true
                        }}
                    />
                    <div className="absolute inset-0">
                        <div>
                            <img src="/images/background/landing-background.webp" alt="background" className="shadow-img max-h-screen mx-auto" />
                        </div>
                        <div className="flex flex-col h-full absolute inset-0">
                            {children}
                        </div>
                    </div>
                </div>
            </BaseLayout>
        );
}
