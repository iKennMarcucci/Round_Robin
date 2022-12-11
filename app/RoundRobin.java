package app;

import java.util.Scanner;

public class RoundRobin {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("=================== Round Robin Scheduling ===================\n");
        System.out.println("--> Digite la cantidad de procesos que desea planificar:");
        int cantProcesos = sc.nextInt();
        System.out.println("--> Digite el quantum de tiempo que desea implementar:");
        int quantum = sc.nextInt();
        boolean respuesta = true;
        while (respuesta) {
            String rta = adquirirString(sc);
            if (rta.equals("N")) {
                System.out.println("--> Digite la cantidad máxima de instrucciones de los procesos:");
                int longitud = sc.nextInt();
                opcionNo(cantProcesos, longitud, quantum);
                respuesta = false;
            } else if (rta.equals("S")) {
                opcionSi(cantProcesos, quantum, sc);
                respuesta = false;
            } else {
                System.err.println("Opción NO reconocida.");
            }
        }
    }

    private static void opcionNo(int cantProcesos, int longitud, int quantum) {
        int[][] array = new int[cantProcesos][2];
        for (int i = 0; i < array.length; i++) {
            array[i][0] = (int) (Math.random() * (longitud - 1)) + 1;
        }
        roundRobinProcess(array, cantProcesos, quantum);
    }

    private static void opcionSi(int cantProcesos, int quantum, Scanner sc) {
        int[][] array = new int[cantProcesos][2];
        for (int i = 0; i < array.length; i++) {
            System.out.println("Digite las cantidad de instrucciones del proceso #" + i);
            array[i][0] = sc.nextInt();
        }
        roundRobinProcess(array, cantProcesos, quantum);
    }

    private static void roundRobinProcess(int[][] array, int cantProcesos, int quantum) {
        int ciclos = 0;
        int time = 0;
        boolean terminado = false;
        System.out.println("--> Cantidad de procesos = " + cantProcesos);
        System.out.println("--> Quantum = " + quantum);

        for (int proceso = 0; proceso < array.length && !terminado; proceso++) {
            if (array[proceso][0] > 0) {
                System.out.println("============ Proceso #" + proceso + " ============");
                System.out.println(" • Ráfaga de CPU a procesar = " + array[proceso][0]);
                array[proceso][0] = array[proceso][0] - quantum;
                if (array[proceso][0] > 0) {
                    time = time + quantum;
                } else {
                    time = (time + quantum) + array[proceso][0];
                    array[proceso][1] = time;
                }
                System.out.println(" • Ráfaga de CPU procesada  = " + array[proceso][0] + "\n");
                ciclos++;
                System.out.println("Ciclo #" + ciclos);
                if (array[proceso][0] > 0) {
                    System.out.println("Tiempo --> " + time);
                } else {
                    System.out.println("Tiempo FINAL --> " + array[proceso][1]);
                }
            }
            for (int i = 0; i < array.length && proceso == cantProcesos - 1; i++) {
                if (array[i][0] <= 0) {
                    terminado = true;
                } else {
                    terminado = false;
                    proceso = -1;
                    break;
                }
            }
        }
        System.out.println("--> Ciclos Totales = " + ciclos);
        System.out.println("Tiempo Total--> " + time);
    }

    private static String adquirirString(Scanner sc) {
        String rta = "";
        System.out.println("--> ¿Desea insertar los procesos manualmente? (S/N)");
        rta = sc.next();
        return rta;
    }
}