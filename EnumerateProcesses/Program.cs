/**
List all running processes, including UWP and thier suspended state.
 * **/

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {

            Process[] processlist = Process.GetProcesses();

            foreach (Process theprocess in processlist)
            {

                bool bSuspended = false;
                if (theprocess.Threads.Count > 0)
                    bSuspended =  (theprocess.Threads[0].ThreadState == ThreadState.Wait) ? (theprocess.Threads[0].WaitReason == ThreadWaitReason.Suspended) : false;
   
                Console.WriteLine("Process: {0} ID: {1} Suspended: {2}", theprocess.ProcessName, theprocess.Id, bSuspended);
            }
        }
    }
}
