import Resource from "./Resource";
import Thing from "./Thing";

export interface TypeIndexRegistration extends Thing {
    addForClass(forClass: string | Resource): TypeIndexRegistration;
    addInstance(instance: string | Resource): TypeIndexRegistration;
    addInstanceContainer(instanceContainer: string | Resource): TypeIndexRegistration;
    isForClass(forClass: string): boolean;
    getForClass(): string | null;
    getForClassAll(): string[];
    getInstance(): string | null;
    getInstanceAll(): string[];
    getInstanceContainer(): string | null;
    getInstanceContainerAll(): string[];
    setForClass(forClass: string): TypeIndexRegistration;
    removeForClass(forClass: string): TypeIndexRegistration;
    removeInstance(instance: string): TypeIndexRegistration;
    removeInstanceContainer(instanceContainer: string): TypeIndexRegistration;
    removeForClassAll(): TypeIndexRegistration;
    removeInstanceAll(): TypeIndexRegistration;
    removeInstanceContainerAll(): TypeIndexRegistration;
}

export default TypeIndexRegistration;